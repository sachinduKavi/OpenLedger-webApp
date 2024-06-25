

// Function that generate current time and date
const generateCurrentDateTime = (regionLocal = "si-LK") => {
    const now = new Date()
    const formattedDate = now.toLocaleDateString(regionLocal, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })

    // const formattedDate = now.toLocaleDateString(regionLocal)
    
      const formattedTime = now.toLocaleTimeString(regionLocal, { 
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Colombo'
      });

      const timeList = formattedTime.split(' ')
      let newTime
      if(timeList[1] === 'AM')
        {newTime = timeList[0]}
      else{
        const sub = timeList[0].split(':')
        newTime = (parseInt(sub[0]) + 12) + ":" + sub[1]
      }

      const dateList = formattedDate.split('/')
      const newDate = `${dateList[2]}-${dateList[0]}-${dateList[1]}`
      
      return `${newDate}#${newTime}`
}


const generateCurrentDate = (regionLocal = "si-LK") => {
  const now = new Date()
    const formattedDate = now.toLocaleDateString(regionLocal, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })

    // const formattedDate = now.toLocaleDateString(regionLocal)
    
      const formattedTime = now.toLocaleTimeString(regionLocal, { 
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Colombo'
      });

      const timeList = formattedTime.split(' ')
      let newTime
      if(timeList[1] === 'AM')
        {newTime = timeList[0]}
      else{
        const sub = timeList[0].split(':')
        newTime = (parseInt(sub[0]) + 12) + ":" + sub[1]
      }

      const dateList = formattedDate.split('/')
      const newDate = `${dateList[2]}-${dateList[0]}-${dateList[1]}`
      
      return `${newDate.toString()}`
}

export {generateCurrentDateTime, generateCurrentDate}