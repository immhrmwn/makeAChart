import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import data from '../data'

function Chart() {
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [item, setItem] = useState(data[0])

  useEffect(() => {
    if (category && date) {
      const filterData = data.filter(el => {
        return el.category === category && el.month_id === date
      })
      console.log(filterData)
      setItem(filterData[0])
    }
  }, [category, date])

  const categoryList = Object.values(data.reduce((a,{category})=>{
    a[category]={category}
    return a;
  },{})).map(el => el.category)

  const month_idList = Object.values(data.reduce((a,{month_id})=>{
    a[month_id]={month_id}
    return a;
  },{})).map(el => el.month_id)
  
  return (
    <div className="chart">
      <h1>Chart</h1>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" selected>Category</option>
          {
            categoryList.map((el, i) => {
              return <option key={i} value={el}>{el}</option>
            })
          }
        </select>
        <select value={date} onChange={(e) => setDate(+(e.target.value))}>
          <option value="" selected>Month ID</option>
          {
            month_idList.map((el, i) => {
              return <option key={i} value={el}>{el}</option>
            })
          }
        </select>
      <Bar
        data={{
          labels: ['Target', 'Delta', 'Achievement'],
          datasets: [{
            label: '# of Votes',
            data: [item.target, [item.target, item.achievement], item.achievement],
            backgroundColor: [
              'grey',
              'green',
              'black',
            ]
          }]
        }}
        options={{

          title: {
            display: true,
            text: `${item.category} - ${item.month_id}`,
            fontSize: 25
          },
          legend: {
            display: false,
            position: 'right'
          },
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                  beginAtZero: true,
                  max: 100,
                  stepSize: 20,
              },
              // gridLines: {
              //   display: false 
              // },
            }],
            xAxes: [{
              barPercentage : 1,
              categoryPercentage : 1
            }]
          },
          tooltips: {
            mode: 'nearest'
          }
        }}
      />
    </div>
  )
}

export default Chart