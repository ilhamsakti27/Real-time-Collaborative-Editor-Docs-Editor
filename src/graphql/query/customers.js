import gql from 'graphql-tag'

const customers = gql`
  query customers {
    customers {
      id
      first_name
      last_name
      gender
      description
      address
      job_title
      birth_date
      phone_number
      whatsapp_number
      email
      instagram
      facebook
      type {
        id
        name
      }
      created_at
      updated_at
      deleted_at
    }
  }
`

export default customers
