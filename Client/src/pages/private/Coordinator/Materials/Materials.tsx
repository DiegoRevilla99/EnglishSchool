import { Box, Container, Typography } from '@mui/material';
import MaterialTabs from './MaterialTabs';

const student = {
  firstName: 'Raul',
  lastName: 'Rodriguez',
  sessionDate: new Date(2023, 4, 18, 18),
  duration: 1,
};

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Nomviembre',
  'Diciembre',
];

const getTimeDate = (time: Date): string => {
  let hour = '';
  let minutes = '';

  if (time.getHours() < 10) {
    hour = '0' + time.getHours();
  } else {
    hour = time.getHours() + '';
  }

  if (time.getMinutes() < 10) {
    minutes = '0' + time.getMinutes();
  } else {
    minutes = time.getMinutes() + '';
  }

  const amPM = time.getHours() >= 12 ? 'PM' : 'AM';

  return `${hour}:${minutes} ${amPM}`;
};

const Materials = () => {
  return (
    <Box bgcolor="#f5f5f5">
      <Container maxWidth="lg">
        <Box py="3rem">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            height="100%"
          >
            <Typography
              variant="body1"
              fontSize={{ xs: 20, md: 40 }}
              color="initial"
              fontFamily="Source Serif Pro"
            >
              {`${student.firstName} ${student.lastName}`}
            </Typography>
            <Typography variant="body1" color="initial">
              {`${
                months[student.sessionDate.getMonth()]
              } ${student.sessionDate.getDate()}, ${student.sessionDate.getFullYear()} | 
              ${getTimeDate(student.sessionDate)} - ${getTimeDate(
                new Date(
                  student.sessionDate.setHours(
                    student.sessionDate.getHours() + 1
                  )
                )
              )} `}
            </Typography>
          </Box>
          <Box pt={3}>
            <MaterialTabs />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Materials;
