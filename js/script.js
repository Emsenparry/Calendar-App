const calcTimeDiff = date => {
    const currentTime = new Date().getTime()
    const futureTime = new Date(`${date} 00:00:00`).getTime()
    const diffTime = (futureTime - currentTime) / 1000
    const diffDays = Math.round(diffTime / 86400)
    return diffDays;
}
console.log(`there are ${calcTimeDiff('2023-12-24')} left until Christmas`);


export const addCalender = (data, id) => {
    const calenders = document.querySelector('.container');

    const html = `
    <section class="container" data-id="${id}">
          <div class="card">
               <div class="brush">
                    <h2>${data.title}</h2>
                    <img src="/assets/images/img.png" alt="brush-stroke">
                    <img class="minus" src="/assets/images/icons8-minus-96.png" alt="delete" data-id="${id}">
               </div>
               <div class="card-details">
                    <h3>There are ${daysLeft} days left until ${data.title}</h3>
               </div>
          </div>
     </section>  
    `
    calenders.innerHTML += html
}

