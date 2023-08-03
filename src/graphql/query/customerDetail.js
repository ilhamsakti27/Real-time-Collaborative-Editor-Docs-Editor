import gql from 'graphql-tag'

const customerDetail = gql`
  query customerDetail(
    $customer_id: Float!
  ) {
    customerDetail(
      customer_id: $customer_id
    ) {
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

export default customerDetail
