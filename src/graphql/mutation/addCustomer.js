import gql from 'graphql-tag'

const addCustomer = gql`
  mutation addCustomer(
    $first_name: String!
    $last_name: String!
    $gender: String!
    $description: String
    $address: String
    $job_title: String
    $birth_date: String!
    $phone_number: String!
    $whatsapp_number: String
    $email: String
    $instagram: String
    $facebook: String
  ) {
    addCustomer(
      first_name: $first_name
      last_name: $last_name
      gender: $gender
      description: $description
      address: $address
      job_title: $job_title
      birth_date: $birth_date
      phone_number: $phone_number
      whatsapp_number: $whatsapp_number
      email: $email
      instagram: $instagram
      facebook: $facebook
    ) {
      status
      msg
    }
  }
`

export default addCustomer
