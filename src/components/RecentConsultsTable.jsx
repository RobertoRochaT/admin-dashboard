import React from 'react'

const RecentSalesTable = ({items}) => {
    const handleStatus = status => {
        switch (status) {
            case 'Pending':
                return 'warning'
            case 'Success':
                return 'success'
            case 'Failed':
                return 'danger'
            default:
                return 'primary'
        }
    }
    const formatDateDays = (dateString) => {
        const date = new Date(dateString); // Convierte la cadena a un objeto Date
      
        // Formatea la fecha
        const day = String(date.getDate()).padStart(2, '0'); // Día con ceros a la izquierda si es necesario
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (0-11, por eso sumamos 1)
        const year = date.getFullYear(); // Año completo
      
        return `${day}/${month}/${year}`;
      };

    const formatDateHours = (dateString) => {
        const date = new Date(dateString); // Convierte la cadena a un objeto Date
        const hours = String(date.getHours()).padStart(2, '0'); // Hora
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutos
        const seconds = String(date.getSeconds()).padStart(2, '0'); // Segundos
        return `${hours}:${minutes}:${seconds}`;
    };
          
  return (
    <table className='table table-borderless datatable'>
        <thead>
            <tr>
                <th scope='col'>Date</th>
                <th scope='col'>Time</th>
                <th scope='col'>Conversation name</th>
                <th scope='col'>Query</th>
                <th scope='col'>Status</th>
            </tr>
        </thead>
        <tbody>
            {items &&
             items.length > 0 &&
             items.map(item => (
                <tr key={item.request_time.value}>
                    <th scope='row'>
                        <a href='#'>{formatDateDays(item.request_time.value)}</a>
                    </th>
                    <th scope='row'>
                        <a href='#'>{formatDateHours(item.request_time.value)}</a>
                    </th>
                    <td>{item.conversation_name.substr(130,150)}</td>
                    <td>
                        <a href='#' className='text-primary'>{item.request.queryInput.text.text}</a>
                    </td>
                    
                    <td>
                        <span className={`badge bg-${handleStatus(item.response.queryResult.intentDetectionConfidence  === 1 ? 'Success' : 'Failed')}`}>
                            {item.response.queryResult.intentDetectionConfidence  === 1 ? 'Success' : 'Failed'}
                        </span>
                    </td>
                </tr>
             ))

            }
        </tbody>
    </table>
  )
}

export default RecentSalesTable