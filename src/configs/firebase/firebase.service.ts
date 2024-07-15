// src/firebase/firebase.service.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseService.name);
  private storage: Storage;

  onModuleInit() {
    const serviceAccount = require(process.env.FIREBASE_SECRET || "D:\\fullstack\\module5\\Project\\server\\src\\configs\\firebase\\secret_key\\firebaseSecret.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.STORAGE_BUCKET || 'spotify-83b9c.appspot.com'
    });

    this.storage = new Storage({
      projectId: serviceAccount.project_id,
      credentials: serviceAccount,
    });

    this.logger.log('Firebase Admin initialized');
  }

  getStorage() {
    return this.storage;
  }

  getBucket() {
    return admin.storage().bucket();
  }
}
