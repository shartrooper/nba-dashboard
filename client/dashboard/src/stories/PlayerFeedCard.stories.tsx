import { Meta, Story } from '@storybook/react';
import { teamsLogosImageRoutes } from '@/utils'

const meta: Meta = {
  title: 'Feed Card',
};

export default meta;

const recordsSample = [
  {
    "id": 503,
    "first_name": "Kenny",
    "last_name": "Smith",
    "position": "",
    "team": {
      "name": "Rockets"
    }
  },
  {
    "id": 504,
    "first_name": "Randy",
    "last_name": "Breuer",
    "position": "",
    "team": {
      "name": "Timberwolves"
    }
  },
  {
    "id": 505,
    "first_name": "Herb",
    "last_name": "Williams",
    "position": "",
    "team": {
      "name": "Mavericks"
    }
  },
  {
    "id": 506,
    "first_name": "Joe",
    "last_name": "Wolf",
    "position": "",
    "team": {
      "name": "Nuggets"
    }
  },
  {
    "id": 507,
    "first_name": "Steve",
    "last_name": "Johnson",
    "position": "",
    "team": {
      "name": "Warriors"
    }
  },
  {
    "id": 508,
    "first_name": "Glen",
    "last_name": "Rice",
    "position": "",
    "team": {
      "name": "Heat"
    }
  },
  {
    "id": 509,
    "first_name": "Greg",
    "last_name": "Foster",
    "position": "",
    "team": {
      "name": "Wizards"
    }
  },
  {
    "id": 510,
    "first_name": "Larry",
    "last_name": "Nance",
    "position": "",
    "team": {
      "name": "Cavaliers"
    }
  },
  {
    "id": 511,
    "first_name": "Duane",
    "last_name": "Ferrell",
    "position": "",
    "team": {
      "name": "Hawks"
    }
  },
  {
    "id": 512,
    "first_name": "Nick",
    "last_name": "Anderson",
    "position": "",
    "team": {
      "name": "Magic"
    }
  }
];

type Record = typeof recordsSample[0];

const Template: Story<Record> = (args) => {
  const { first_name, last_name, position, team: { name: teamName } } = args;
  return (
    <div className="pt-8">
      <div className="border-2 border-chalkboard w-full flex justify-around items-center">
        <p> {first_name} {last_name} </p>
        <p>Pos: {position || "N/A"}</p>
        <img alt={`${teamName} logo`} src={teamsLogosImageRoutes[teamName]} className="w-14 h-14"></img>
      </div>
    </div>
  )
};

export const SinglePlayerRecord = Template.bind({});
//with a random player record.
const randNum = Math.round(Math.random() * (recordsSample.length - 1));
SinglePlayerRecord.args = recordsSample[randNum];

export const multiplePlayersRecord = () => {
  return <div>
    {recordsSample.map((player, index) => <Template key={`${player.first_name}-${player.last_name}-${index}`}{...player}></Template>)}
  </div>
}