import React, { useState } from 'react';
import dayjs from 'dayjs';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

const FORMATE = 'YYYY/MM/DD HH:mm';
const WEEK_DAY = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  0: '日',
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 520,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  list: {
    width: '100%',
    marginTop: 16,
  },
  head: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottom: '1px solid #e5e5e5',
    padding: '20px 0',
  },
}));
export default function DateCal() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(dayjs().set('hour', 8).set('minute', 0).toDate());
  const [dateList, setDateList] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDateList([...dateList, date]);
  };

  const getDayOfWeek = (date) => {
    return '周' + WEEK_DAY[dayjs(date).day()];
  };

  console.log('selectedDate:', selectedDate);
  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          margin='normal'
          id='date-picker-dialog'
          label='选个时间'
          format='yyyy/MM/dd HH:mm'
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <div className={classes.list}>
        <div className={classes.head}>
          <h3>北京时间: </h3>
          <h3>纽约时间: </h3>
        </div>
        {dateList.map((d) => {
          const currDate = d;
          const nyDate = dayjs(currDate).subtract(12, 'hour');

          return (
            <div className={`date-item ${classes.item}`}>
              <div>
                {getDayOfWeek(currDate)} {dayjs(currDate).format(FORMATE)}
              </div>
              <div>
                {getDayOfWeek(nyDate)} {nyDate.format(FORMATE)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
