// import Mock from 'mockjs'

export default [
  {
    url: '/Api/GetUsersByUserId',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: []
      }
    }
  },
]


