import { Client } from "@notionhq/client";

export enum Availability {
  "saturday" = "saturday",
  "sunday" = "sunday",
  "wedding" = "wedding",
  "wine" = "wine",
}

export type Registration = {
  firstname: string;
  lastname: string;
  email: string;
  nbPersons: number;
  availabilities: Availability[];
  anecdote?: string;
};

const availabilityToNotionName = (availability: Availability) => {
  switch (availability) {
    case Availability.saturday:
      return "Samedi";
    case Availability.sunday:
      return "Dimanche";
    case Availability.wedding:
      return "Mariage";
    case Availability.wine:
      return "Vin d'honneur";
  }
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
            name: availabilityToNotionName(availability),
          })),
        },
      },
      children: [
        {
          object: "block",
          paragraph: {
            rich_text: [
              {
                text: {
                  content: `Anecdote: ${parameters.anecdote || ""}`,
                },
              },
            ],
          },
        },
      ],
    });
  }
}

export default new Notion();
