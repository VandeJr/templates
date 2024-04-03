import { default as Handlebars } from 'handlebars'

Handlebars.registerHelper('title', function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

const handlebars = Handlebars

export default handlebars
