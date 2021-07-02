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
  tips: {
    width: '100%',
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#B37D59',
    fontSize: 15,
    opacity: 0.8,
    '& > p': {
      margin: '3px 0',
      padding: 0,
    },
  },
  head: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: '#333',
  },
  item: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottom: '1px solid #e5e5e5',
    padding: '20px 0',
    fontSize: 14,
    '&:nth-child(2n)': {
      backgroundColor: '#f5f5f5',
    },

    '&:nth-child(2n+1)': {
      backgroundColor: 'rgba(179,125,89,0.1)',
    },
  },
  week: {
    fontWeight: 500,
    fontSize: 15,
    paddingRight: 2,
  }
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
      {dateList.length ? (
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
                  <span className={classes.week}>{getDayOfWeek(currDate)} </span> {dayjs(currDate).format(FORMATE)}
                </div>
                <div>
                  <span className={classes.week}>{getDayOfWeek(nyDate)} </span> {nyDate.format(FORMATE)}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={classes.tips}>
          <p>🦌</p>
          <p>请选择一个时间</p>
          <p>可以多次选择</p>
        </div>
      )}
    </div>
  );
}
