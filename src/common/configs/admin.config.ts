import env from 'env-var';

export const adminConfig = {
  name: env.get('NAME').required().asString(),
  surname: env.get('SURNAME').required().asString(),
  city: env.get('CITY').required().asString(),
  email: env.get('EMAIL').required().asEmailString(),
  password: env.get('PASSWORD').required().asString(),
};
