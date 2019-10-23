import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import PlayersList from "./components/PlayersList/PlayersList";
import AddPlayer from "./components/AddPlayer/AddPlayer";

it("renders without crashing", () => {
  shallow(<App />);
});

it("should update player score", () => {
  const appComponent = shallow(<App />);

  const players = [
    {
      name: "Kunegunda",
      score: 5
    },
    {
      name: "Antoś",
      score: 0
    }
  ];

  appComponent.setState({ players });

  const onScoreUpdate = appComponent.find(PlayersList).prop("onScoreUpdate");

  onScoreUpdate(0, 5);

  const playersAfterUpdate = appComponent.state("players");

  expect(playersAfterUpdate[0].score).toEqual(10);
});

it("should add player to state", () => {
  const appComponent = shallow(<App />);

  const onPlayerAdd = appComponent.find(AddPlayer).prop("onPlayerAdd");

  onPlayerAdd("Ania");

  const players = appComponent.state("players");

  expect(players.length).toEqual(1);
  expect(players[0].name).toEqual("Ania");
  expect(players[0].score).toEqual(0);
});

it("should remove player from list", () => {
  const appComponent = shallow(<App />);

  const players = [
    {
      name: "Genowefa",
      score: 5
    },
    {
      name: "Romuald",
      score: 2
    }
  ];

  appComponent.setState({ players });

  const onPlayerRemove = appComponent.find(PlayersList).prop("onPlayerRemove");

  onPlayerRemove(0);

  const playersAfterUpdate = appComponent.state("players");

  expect(playersAfterUpdate.length).toEqual(1);
  expect(playersAfterUpdate[0].name).toEqual("Romuald");
  expect(playersAfterUpdate[0].score).toEqual(2);
});
