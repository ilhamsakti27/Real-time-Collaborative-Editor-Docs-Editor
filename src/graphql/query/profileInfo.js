import gql from 'graphql-tag'

const profileInfo = gql`
  query {
    user {
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
      last_seen_at
      created_at
      updated_at
    }
  }
`

export default profileInfo
