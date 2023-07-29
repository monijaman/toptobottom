import appointmentsData from '.mock/appointments.json'
//import parse from 'html-react-parser'
//import DOMPurify from 'isomorphic-dompurify'

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export function fetch(method, url, data) {
  // if (method == 'GET' && url == '/appointments') {
  //   let events = appointmentsData.gapEvents[data.gap]
  //   if (!data.pastAppointments) {
  //     events = events.filter(event => event.time + event.duration * 60 * 1000 > new Date().getTime())
  //   }
  //   return Promise.resolve(events)
  // }
}

export function sanitize(data) {
  // parse(DOMPurify.sanitize(data))
  return <span dangerouslySetInnerHTML={{__html: data}} />
}
