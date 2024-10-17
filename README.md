# Epicfy Backend
Backend from application that improve solutions around the world.

# Getting Started

## Configurações Iniciais

Primeiro passo é preencher o arquivo `example.env` com as configurações que desejar. Logo em seguida, basta renomear esse mesmo arquivo para `.env` e pronto.

## Comandos

```shell
$ docker compose up # Para iniciar os containers.
$ docker exec -it epicfy_backend sh # Entrando no container da aplicação Node.
$ yarn migrate:run # Rodar as migrations no banco de dados dentro do container.
```
