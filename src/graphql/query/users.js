import gql from 'graphql-tag'

const users = gql`
  query {
    users {
      id
      phone
      email
      first_name
      last_name
      photo
      notify
      role {
        id
        name
      }
      user_status {
        id
        name
      }
      last_seen_at
      created_at
      updated_at
    }
  }
`

export default users
