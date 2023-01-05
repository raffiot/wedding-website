import { Client } from "@notionhq/client";

export enum Availability {
  "saturday" = "saturday",
  "sunday" = "sunday",
}

export type Registration = {
  firstname: string;
  lastname: string;
  email: string;
  nbPersons: number;
  availabilities: Availability[];
  anecdote?: string;
};

class Notion {
  client: Client;
  constructor() {
    this.client = new Client({ auth: process.env.NOTION_TOKEN });
  }

  async writeRegistration(parameters: Registration): Promise<void> {
    await this.client.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID as string,
      },
      properties: {
        Nom: {
          title: [
            {
              text: {
                content: `${parameters.firstname} ${parameters.lastname}`,
              },
            },
          ],
        },
        "Nombre de personnes": {
          number: parameters.nbPersons,
        },
        Email: {
          email: parameters.email,
        },
        Disponible: {
          multi_select: parameters.availabilities.map((availability) => ({
            name:
              availability === Availability.saturday ? "Samedi" : "Dimanche",
          })),
        },
        Anecdote: {
          rich_text: [
            {
              text: {
                content: parameters.anecdote || "",
              },
            },
          ],
        },
      },
    });
  }
}

export default new Notion();
