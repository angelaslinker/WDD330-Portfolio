class Alert {
    constructor() {
      this.alerts = [];
      this.fetchAlerts();
    }
  
    async fetchAlerts() {
      try {
        const response = await fetch('./public/json/alerts.json');
        const alerts = await response.json();
        this.alerts = alerts;
        this.render();
      } catch (error){}
    }

  render() {
    const alertList = document.createElement('section');
    alertList.classList.add('alert-list');
    this.alerts.forEach(alert => {
      const { message, background, color } = alert;
      const alertElement = document.createElement('p');
      alertElement.textContent = message;
      alertElement.style.backgroundColor = background;
      alertElement.style.color = color;
      alertList.appendChild(alertElement);
    });
    const main = document.querySelector('main');
    main.insertBefore(alertList, main.firstChild);
  }

    
  }
  
  export default Alert;
  