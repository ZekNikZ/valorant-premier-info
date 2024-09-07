import styled from 'styled-components'
import './App.css'
import { CalendarCell } from './CalendarCell';
import { useMemo } from 'react';
import data from './data.json';
import dayjs, { Dayjs } from 'dayjs';

function App() {
  const days: (Dayjs | null)[] = useMemo(() => {
    const startDate = dayjs(data.calendar.start);
    const endDate = dayjs(data.calendar.end);

    const result = [];

    let currentDate = startDate;

    // Compute number of days to skip at start
    const daysToSkip = startDate.day();
    for (let i = 0; i < daysToSkip; i++) {
      result.push(null);
    }

    while (!currentDate.isAfter(endDate)) {
      result.push(currentDate);
      currentDate = currentDate.add(1, 'day');
    }

    return result;
  }, []);

  const nextPractice = data.matches.find((match) => match.type === "practice" && !dayjs(match.date).isBefore(dayjs(), "day"));
  const nextMatch = data.matches.find((match) => match.type !== "practice" && !dayjs(match.date).isBefore(dayjs(), "day"));

  return (
      <Container>
        <Title>Valorant Premier Schedule</Title>
        <NextMatchContainer>
          <NextMatchColumn>
            <NextMatchTitle>Next Practice</NextMatchTitle>
            {nextPractice && <CalendarCell date={dayjs(nextPractice?.date)} map={nextPractice.map} time={dayjs(nextPractice.time)} showMonth practice />}
          </NextMatchColumn>
          <NextMatchColumn>
            <NextMatchTitle>Next Match</NextMatchTitle>
            {nextMatch && <CalendarCell date={dayjs(nextMatch.date)} map={nextMatch.map} time={dayjs(nextMatch.time)} showMonth />}
          </NextMatchColumn>
        </NextMatchContainer>
        <Calendar>
          {days.map((day, i) => {
            const match = data.matches.find((match) => match.date === day?.format('YYYY-MM-DD'));
            return (
              day ? (<CalendarCell key={day.format('YYYY-MM-DD')} date={day} map={match?.map} time={match?.time ? dayjs(match?.time): undefined} practice={match?.type === "practice"} showMonth={day.isSame(dayjs(data.calendar.start))}/>) : (<div key={i} />)
            );
          })}
        </Calendar>
      </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(49, 49, 49);
  overflow-y: auto;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;

const NextMatchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const NextMatchColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  width: 200px;
  gap: 10px;
`;

const NextMatchTitle = styled.h3`
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
`;

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  max-width: 1000px;
  width: 100%;
`;

export default App
