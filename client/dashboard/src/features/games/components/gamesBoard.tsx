import { Tab } from "@headlessui/react";
import { ParsedGame } from "../types";
import clsx from "clsx";
import { useState } from "react";
import { parseDate, teamsLogosImageRoutes } from "@/utils";


export const GamesBoardContainer = ({ games, boardTitle }: { games: ParsedGame[], boardTitle: string }) => {

	const mapSamples = (game: ParsedGame) => {
		const {
			homeTeamScore,
			visitorTeamScore,
			homeTeam,
			visitorTeam,
			period,
			status,
			date,
			id
		} = game;

		return {
			id,
			homeTeamName: homeTeam.name,
			visitorTeamName: visitorTeam.name,
			date,
			status,
			period,
			homeScore: homeTeamScore,
			visitorScore: visitorTeamScore
		}
	};

	const [categories] = useState({
		All: games.map(mapSamples),
		Playoff: games.filter(game => game.postseason).map(mapSamples),
	});

	return (
		<div className="w-full max-w-md px-2 py-16 sm:px-0 self-center text-center">
			<p className="text-lg">{boardTitle}</p>
			<ul className="mt-1 space-x-1 text-xs font-normal leading-4 text-chalkboard">
				<li>* Time expressed in UTC standard</li>
				<li>* Data is updated every 10 minutes</li>
			</ul>
			<Tab.Group>
				<Tab.List className="flex mt-4 space-x-1 rounded-xl bg-basketball p-1">
					{Object.keys(categories).map((category) => (
						<Tab
							key={category}
							className={({ selected }) =>
								clsx(
									'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
									'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
									selected
										? 'bg-white shadow'
										: 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
								)
							}
						>
							{category}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels className="mt-2">
					{Object.values(categories).map((posts, idx) => (
						<Tab.Panel
							key={idx}
							className={clsx(
								'rounded-xl bg-white p-3 max-h-board overflow-auto',
								'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
							)}
						>
							<ul>
								{posts.map((post) => (
									<li
										key={post.id}
										className="relative rounded-md text-midnight p-3 hover:bg-gray-100 flex flex-col items-center"
									>
										<div className='flex justify-start w-full font-normal leading-4'>
											<p>
												{parseDate.dayAndMonth(post.date)}
											</p>
										</div>
										<h3 className="flex text-sm font-medium leading-5 text-center">
											<div className='flex flex-col'>
												<img alt={`${post.homeTeamName} logo`} src={teamsLogosImageRoutes[post.homeTeamName]} className="w-14 h-14"></img>
												{post.homeScore}
											</div>
											vs.
											<div className='flex flex-col'>
												<img alt={`${post.visitorTeamName} logo`} src={teamsLogosImageRoutes[post.visitorTeamName]} className="w-14 h-14"></img>
												{post.visitorScore}
											</div>
										</h3>
										<ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
											<li>{parseDate.validate(post.status) ? parseDate.calendar(post.status) : post.status}</li>
											<li>&middot;</li>
											<li>Period {post.period}</li>
										</ul>
									</li>
								))}
							</ul>
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	)
};