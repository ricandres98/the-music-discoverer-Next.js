module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        // port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**'

      }
    ],
    // domains: [
    //   'i.scdn.co',
    //   'via.placeholder.com'
    // ]
  }
}
