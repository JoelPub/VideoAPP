module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '199dbde9e7f7a3134dab80253d2b24a2'),
  },
});
