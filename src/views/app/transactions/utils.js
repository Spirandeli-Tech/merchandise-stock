import { reduce } from 'lodash';
import moment from 'moment';
import { TRANSACTION_TOKENS } from './i18next';

const handleResponse = (response) => {
  const output = response.map((obj) => {
    return Object.keys(obj).sort().map((key) => {
      return obj[key];
    });
  });

  const mapedData = reduce(output, (r, c) => r.concat(c), [])

  const newResponse = mapedData.map((dto) => ({
    date: moment(dto?.date).format('DD/MM/YYYY'),
    type: TRANSACTION_TOKENS[dto?.type],
    method: TRANSACTION_TOKENS[dto?.transaction?.method],
    name: dto?.displayName,
  }))
  return newResponse
}

export default handleResponse

