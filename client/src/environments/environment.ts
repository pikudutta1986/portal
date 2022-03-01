// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiBase: 'http://206.189.231.209/server/index.php/api/'
  apiBase: 'http://localhost:8000/api/',
  s3AccessKeyId: 'AKIA56MWS254XLU64PO7',
  s3SecretAccessKey: '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',
  s3BucketName: 'tuco-portal',
  s3Region: 'us-east-1'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
 // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
