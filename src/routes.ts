import { Request, Response, Router } from "express";
import { Readable } from "stream";
import readline from "readline";

import multer from "multer";
import { client } from "./database/client";

const multerConfig = multer();

const router = Router();

interface Outsource {
  req: string;
  orc: string;
  abertura: string;
  hora_abertura: string;
  contato: number;
  nome_do_cliente: string;
  titulo: string;
  equipamento: string;
  serial: string;
  solicitante: string;
  telefone: string;
  email: string;
  cidade: string;
  uf: string;
  status: string;
  os: string;
  previsao: string;
  sla: number;
}



router.get("/outsourcing", async (request: Request, response: Response) => {
  try {
    //const allOutsourcing = await client.query

    const result = await client.$queryRaw`SELECT * FROM Outsourcing`;
    //console.log(result);
    return response.json(result);

  } catch (err) {
    console.log("erro");
  }

  //return response.json({ message: "Hello World Ignite!" });
});

router.post(
  "/outsourcing",
  multerConfig.single("file"),
  async (request: Request, response: Response) => {
    const { file } = request;
    const { buffer }: any = file;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const outsourcingLine = readline.createInterface({
      input: readableFile,
    });

    const outsourcing: Outsource[] = [];


    for await (let line of outsourcingLine) {
      const outsourceLineSplit = line.split(";");



      outsourcing.push({
        req: outsourceLineSplit[0],
        orc: outsourceLineSplit[1],
        abertura: outsourceLineSplit[2],
        hora_abertura: outsourceLineSplit[3],
        contato: Number(outsourceLineSplit[4]),
        nome_do_cliente: outsourceLineSplit[5],
        titulo: outsourceLineSplit[6],
        equipamento: outsourceLineSplit[7],
        serial: outsourceLineSplit[8],
        solicitante: outsourceLineSplit[9],
        telefone: outsourceLineSplit[10],
        email: outsourceLineSplit[11],
        cidade: outsourceLineSplit[12],
        uf: outsourceLineSplit[13],
        status: outsourceLineSplit[14],
        os: outsourceLineSplit[15],
        previsao: outsourceLineSplit[16],
        sla: Number(outsourceLineSplit[17])
      });
    }

    for await (let { req, orc, abertura, hora_abertura, contato, nome_do_cliente, titulo, equipamento, serial, solicitante, telefone, email, cidade, uf, status, os, previsao, sla } of outsourcing) {
      await client.outsourcing.create({
        data: {
          req,
          orc,
          abertura,
          hora_abertura,
          contato,
          nome_do_cliente,
          titulo,
          equipamento,
          serial,
          solicitante,
          telefone,
          email,
          cidade,
          uf,
          status,
          os,
          previsao,
          sla,
        },
      });
    }

    return response.send(outsourcing);
  })

export { router };