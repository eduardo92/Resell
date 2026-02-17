
import * as sql from 'mssql';

const requiredEnvVars = ['SQL_USER', 'SQL_PASSWORD', 'SQL_SERVER', 'SQL_DATABASE'];
for (const v of requiredEnvVars) {
    if (!process.env[v]) throw new Error(`Missing required environment variable: ${v}`);
}

const config: sql.config = {
    user: process.env.SQL_USER!,
    password: process.env.SQL_PASSWORD!,
    server: process.env.SQL_SERVER!,
    database: process.env.SQL_DATABASE!,
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

export class SqlDbService {
    private static instance: SqlDbService;
    private pool: sql.ConnectionPool | null = null;

    private constructor() { }

    public static getInstance(): SqlDbService {
        if (!SqlDbService.instance) {
            SqlDbService.instance = new SqlDbService();
        }
        return SqlDbService.instance;
    }

    private async getPool(): Promise<sql.ConnectionPool> {
        if (this.pool) return this.pool;
        this.pool = await new sql.ConnectionPool(config).connect();
        return this.pool;
    }

    public async executeQuery(query: string, params?: { name: string, type: sql.ISqlType, value: any }[]) {
        const pool = await this.getPool();
        const request = pool.request();
        if (params) {
            params.forEach(p => request.input(p.name, p.type, p.value));
        }
        return request.query(query);
    }

    public async initDatabase() {
        const createTableQuery = `
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Sites')
            BEGIN
                CREATE TABLE Sites (
                    slug NVARCHAR(255) PRIMARY KEY,
                    businessName NVARCHAR(500) NOT NULL,
                    status NVARCHAR(50) NOT NULL,
                    configJson NVARCHAR(MAX) NOT NULL,
                    lastUpdated DATETIME2 DEFAULT GETDATE()
                )
            END
        `;
        await this.executeQuery(createTableQuery);
    }

    public async upsertSite(site: any) {
        const query = `
            IF EXISTS (SELECT 1 FROM Sites WHERE slug = @slug)
            BEGIN
                UPDATE Sites 
                SET businessName = @businessName, 
                    status = @status, 
                    configJson = @configJson, 
                    lastUpdated = GETDATE()
                WHERE slug = @slug
            END
            ELSE
            BEGIN
                INSERT INTO Sites (slug, businessName, status, configJson, lastUpdated)
                VALUES (@slug, @businessName, @status, @configJson, GETDATE())
            END
        `;
        await this.executeQuery(query, [
            { name: 'slug', type: sql.NVarChar(255), value: site.slug },
            { name: 'businessName', type: sql.NVarChar(500), value: site.businessName },
            { name: 'status', type: sql.NVarChar(50), value: site.status },
            { name: 'configJson', type: sql.NVarChar(sql.MAX), value: JSON.stringify(site) }
        ]);
    }

    public async getAllSites() {
        const query = "SELECT configJson FROM Sites ORDER BY lastUpdated DESC";
        const result = await this.executeQuery(query);
        return result.recordset.map(r => JSON.parse(r.configJson));
    }

    public async getSiteBySlug(slug: string) {
        const query = "SELECT configJson FROM Sites WHERE slug = @slug";
        const result = await this.executeQuery(query, [
            { name: 'slug', type: sql.NVarChar(255), value: slug }
        ]);
        if (result.recordset.length === 0) return null;
        return JSON.parse(result.recordset[0].configJson);
    }
}
