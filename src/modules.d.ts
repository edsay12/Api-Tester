declare namespace NodeJS {
    export interface ProcessEnv {
        DATABASE_HOST:string
        DATABASE_PORT:number
        DATABASE_PASSWORD:string
        DATABASE_NAME:string
        DATABASE_USERNAME:string 
    }
  }