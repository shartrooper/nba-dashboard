import { Button } from "@/components/Elements/Button";
import { Form, InputField, InputFieldProps } from "@/components/Form";
import { arrayRange } from "@/utils";
import { z } from "zod";

const dateValidation = (dto: DatePickerDTOValues): boolean => {
  const { start_date, end_date } = dto;
  if (!start_date || !end_date) {
    return true;
  }

  return new Date(end_date) >= new Date(start_date);
}

const isAValidSeason = (date: string, season: string) => {
  const earliestSeasonDate = new Date(season);
  return new Date(date) >= earliestSeasonDate;
}

const errorMsg = "Only dates later than the selected season are admitted."

const schema = z
  .object({
    start_date: z.string(),
    season: z.string(),
    end_date: z.string(),
  }).refine(dateValidation, {
    message: "End date shouldnt be earlier than starting date",
    path: ['end_date'],
  })
  .refine(dto => !dto.start_date || new Date(dto.start_date).getFullYear() === parseInt(dto.season),
    {
      message: 'Pick a starting date within the selected season year',
      path: ['start_date']
    })
  .refine(
    dto => !dto.start_date || isAValidSeason(dto.start_date, dto.season), {
    message: errorMsg,
    path: ['start_date']
  }).refine(
    dto => !dto.end_date || isAValidSeason(dto.end_date, dto.season), {
    message: errorMsg,
    path: ['end_date']
  });

type DatePickerDTOValues = {
  start_date?: string;
  season?: string;
  end_date?: string;
};

type SelectorComponentProps = Pick<InputFieldProps, 'registration'> & { label: string }

const seasons = arrayRange(1979, new Date().getFullYear() - 1, 1).reverse();

function SelectorComponent({ registration, label }: SelectorComponentProps) {
  return (
    <div>
      <label className='block text-sm font-medium text-chalkboard mb-1'>
        {label}
      </label>
      <select className="text-midnight px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" {...registration} >
        {seasons.map(year =>
          <option key={year} value={year} >{year}</option>
        )}
      </select>
    </div>
  )
}

type SubmitDTOValues = DatePickerDTOValues & { seasons?: number[] };

export type FetchDTOValues = SubmitDTOValues & { id: number, playerIds: number[] };

export const DateSeasonForm = ({ playerId, fetch }: { playerId: number, fetch: (dto: FetchDTOValues ) => void }) => {

  return (
    <div className="flex-col items-center">
      <p className="my-3"> Submit seasons's period</p>
      <Form<DatePickerDTOValues, typeof schema>
        onSubmit={dto => {
          const parsedDto: SubmitDTOValues = { ...dto }
          const season = dto.season;
          if (season) {
            parsedDto.seasons = [parseInt(season)];
          }
          fetch({ ...parsedDto, id: playerId, playerIds: [playerId] });
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <SelectorComponent label="Season's year" registration={register('season')} />
            <InputField
              type="date"
              label="Starting date"
              registration={register('start_date')}
              error={formState.errors['start_date']}
            />
            <InputField
              type="date"
              label="Ending date"
              registration={register('end_date')}
              error={formState.errors['end_date']}
            />
            <div className="flex justify-center center-items">
              <Button size="sm" type="submit">
                Submit
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  )
};