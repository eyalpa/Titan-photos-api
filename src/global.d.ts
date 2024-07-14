// src/global.d.ts

declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      UNSPLASH_ACCESS_KEY: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_TTL: string;
    }
  }
  