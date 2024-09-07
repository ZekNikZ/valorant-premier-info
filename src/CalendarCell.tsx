import styled from "styled-components";
import { MapName, MAPS } from "./maps";
import { Dayjs } from "dayjs";

interface Props {
  date: Dayjs;
  map?: MapName;
  time?: Dayjs;
  practice?: boolean;
  showMonth?: boolean;
}

export const CalendarCell = (props: Props) => {
  const today = props.date.isSame(new Date(), 'day');

  return <Container $map={props.map} $month={props.date.month()} $practice={props.practice ?? false} $today={today}>
    <DateNumber>{props.date.date() == 1 || props.showMonth ? props.date.format("MMM"): ""} {props.date.format("D")}</DateNumber>
    {props.map && <MapLabel>{props.map.toUpperCase()}</MapLabel>}
    {props.time && <TimeLabel>{props.time.format("h A")}</TimeLabel>}
    {props.practice && <TypeLabel>PRACTICE</TypeLabel>}
  </Container>
}

const Container = styled.div<{$map?: MapName, $month: number, $practice: boolean, $today: boolean}>`
  position: relative;
  height: 120px;

  background-color: ${props => props.$month % 2 == 0 ? '#404040' : '#4d4d4d'};
  background-size: cover;
  background-position-x: center;
  background-position-y: center;

  ${props => props.$map ? 
    props.$practice ? 
      `background-color: unset; background-image: linear-gradient(black, black), url(${MAPS[props.$map].src}); background-blend-mode: saturation;`
      : `background-color: unset; background-image: url(${MAPS[props.$map].src})`
      : ''};

  &:before {
    content: "";
    position: absolute;
    left: -3px;
    right: -3px;
    top: -3px;
    bottom: -3px;
    ${props => props.$today ? `border: 3px solid #FF4655;` : ''};
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    ${props => props.$map ? `background: linear-gradient(to top, #00000060 50%, #00000000)` : ''};
  }
`;

const DateNumber = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  font-size: 20px;
  z-index: 1000;
`;

const MapLabel = styled.div`
  position: absolute;
  bottom: 24px;
  left: 10px;
  color: white;
  font-size: 24px;
  z-index: 1000;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TimeLabel = styled.div`
  position: absolute;
  bottom: 5px;
  left: 10px;
  color: white;
  font-size: 20px;
  z-index: 1000;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TypeLabel = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  font-size: 14px;
  z-index: 1000;
  text-overflow: ellipsis;
  white-space: nowrap;
`;