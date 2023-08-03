import gql from 'graphql-tag'

const login = gql`
  mutation(
    $phone: String!
    $password: String!
  ){
    login(
      phone: $phone
      password: $password
    ) {
      status
      token
      refreshToken
    }
  }
`

export default login
