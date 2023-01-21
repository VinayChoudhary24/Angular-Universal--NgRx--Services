## ANGULAR UNIVERSAL -- Allows us to Pre-Render Angular App on the Server.

## LOADING -- Users get the Finished Page, Initial Rendering is not done inside the Browser and Only Subsequent Actions are Handled by the Browser.

## CHECKING THE PAGE SOURCE -- index.html

## ADVANTAGES of UNIVERSAL
        -- First Request is Pre-Rendered. 
        -- Users with Slower Network Get a Pre-Rendered Page.
        -- Pre-Rendering index.html Gives a GOOD INDEX Score for SEO. 

### ADD ANGULAR UNIVERSAL To PROJECT
           -- ng add @nguniversal/express-engine

           -- IF REQUIRED ADD inside aap.server.module.ts ModuleMapLoaderModule with command - npm install --save @nguniversal/module-map-ngfactory-loader. 

           --To start rendering Universal on your local system, use the following command 
                         -- npm run dev:ssr
                         -- npm run serve:ssr 
                         -- npm run build:ssr

### Modify LocalStorage Loading i.e LocalStorage Loading Will Fail on Server, So We Dont DISPATCH LocalStorage Function when rendered Over the Server
             -- Locate the LocalStorage Function Execution Component i.e app.component.ts

             -- import { Inject, PLATFORM_ID } from '@angular/core';
             -- import { isPlatformBrowser } from '@angular/common';
             -- Inject platformId for SSR
                  @Inject(PLATFORM_ID) private platformId

### DEPLOYING UNIVERSAL APPS
             ---We can't deploy an Angular Universal app to a static host (i.e. Firebase Hosting, AWS S3 etc will NOT work).

             ---The reason for this is, that you're using Node.js to pre-render pages on the server and those Hosts don't support Node.js.

             ---Hence you need a host that does - for example AWS ElasticBeanstalk or Heroku.

             ---To these hosts, you need to upload your dist/ folder along with the package.json file. On the web server, you then have to ensure that npm install is executed, followed by npm serve:ssr.
