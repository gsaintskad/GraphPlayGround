import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {
  const PORT=process.env.PORT||5000;
  const app= await NestFactory.create(AppModule);
//
  const config = new DocumentBuilder()
      .setTitle("Users")
      .setDescription("Users Controller")
      .setVersion("1.0")
      .addTag("slava")
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs',app,document);
  await app.listen(PORT,()=>console.log(`server is listening at ${PORT}`));
}
start();