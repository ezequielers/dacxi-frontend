/* eslint-disable */
export const VeeConfig = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: null,
  errorBagName: 'errors', // change if property conflicts
  events: 'input|blur',
  fieldsBagName: 'fields',
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'pt_BR',
  validity: false
}

const messages = {
  _default: (field) => `O valor do campo não é válido.`,
  after: (field, [target]) => `O campo ${field} deve estar depois do campo ${target}.`,
  alpha_dash: (field) => `O campo deve conter letras, números e traços.`,
  alpha_num: (field) => `O campo  deve conter somente letras e números.`,
  alpha_spaces: (field) => `O campo só pode conter caracteres alfabéticos e espaços.`,
  alpha: (field) => `O campo deve conter somente letras.`,
  before: (field, [target]) => `O campo ${field} deve estar antes do campo ${target}.`,
  between: (field, [min, max]) => `O campo deve estar entre ${min} e ${max}.`,
  confirmed: (field, [confirmedField]) => `Os campos ${field} e ${confirmedField} devem ser iguais.`,
  credit_card: (field) => `O campo é inválido.`,
  date_between: (field, [min, max]) => `O campo deve estar entre ${min} e ${max}.`,
  date_format: (field, [format]) => `O campo deve estar no formato ${format}.`,
  decimal: (field, [decimals = '*'] = []) => `O campo deve ser numérico e deve conter ${!decimals || decimals === '*' ? '' : decimals} casas decimais.`,
  digits: (field, [length]) => `O campo deve ser numérico e ter exatamente ${length} dígitos.`,
  dimensions: (field, [width, height]) => `O campo deve ter ${width} pixels de largura por ${height} pixels de altura.`,
  email: (field) => `O campo deve ser um email válido.`,
  ext: (field) => `O campo deve ser um arquivo válido.`,
  image: (field) => `O campo deve ser uma imagem.`,
  included: (field) => `O campo deve ter um valor válido.`,
  integer: (field) => `O campo deve ser um número inteiro.`,
  ip: (field) => `O campo deve ser um endereço IP válido.`,
  length: (field, [length, max]) => {
    if (max) {
      return `O tamanho do campo está entre ${length} e ${max}.`
    }
    return `O tamanho do campo deve ser ${length}.`
  },
  max: (field, [length]) => `O campo não deve ter mais que ${length} caracteres.`,
  max_value: (field, [max]) => `O campo precisa ser ${max} ou menor.`,
  mimes: (field) => `O campo deve ser um tipo de arquivo válido.`,
  min: (field, [length]) => `O campo deve conter pelo menos ${length} caracteres.`,
  min_value: (field, [min]) => `O campo precisa ser ${min} ou maior.`,
  excluded: (field) => `O campo deve ser um valor válido.`,
  numeric: (field) => `O campo deve conter apenas números`,
  regex: (field) => `O campo possui um formato inválido.`,
  required: (field) => `O campo é obrigatório.`,
  size: (field, [size]) => `O arquivo deve ser menor que ${formatFileformatFileSize(size, true)}.`,
  url: (field) => `O campo não é uma URL válida.`,
  isPhoneNumber: (field, [format]) => `O campo deve ter seu um telefone válido.`,
  isValidDate: (field, [format]) => `O campo deve ter seu uma data válida.`,
  isCpfCnpj: (field, [format]) => `O campo deve ter seu um CPF/CNPJ válido.`
}

function formatFileformatFileSize(bytes, si) {
  var thresh = si ? 1000 : 1024;
  bytes = bytes * thresh
  if(Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }
  var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB']
  var u = -1
  do {
    bytes /= thresh
    ++u
  } while(Math.abs(bytes) >= thresh && u < units.length - 1)
  return bytes.toFixed(1) + ' ' + units[u]
}

export const locale = {
  name: 'pt_BR',
  messages,
  // eslint-disable-next-line indent
  attributes: {}
}

// Validação do campo do Tipo Telefone ( Fixo ou Celular )
export const isPhoneNumber = {
  getMessage(field, params, data) {
    return (data && data.message) || `O campo deve ter seu um telefone válido.`;
  },
  validate(value, [min, max]) {
    return new Promise(resolve => {
      resolve({
        valid: value.length < min || value.length > max ? false : !! value,
        data: value !== 'trigger' ? undefined : { message: 'Not this value' }
      })
    })
  }
}

// Validação do campo do Tipo Documento ( CPF ou CNPJ )
export const isCpfCnpj = {
  getMessage(field, params, data) {
    return (data && data.message) || `O campo deve ter seu um CPF/CNPJ válido.`;
  },
  validate(value, [min, max]) {
    return new Promise(resolve => {
      resolve({
        valid: value.length < min || value.length > max ? false : !! value,
        data: value !== 'trigger' ? undefined : { message: 'Not this value' }
      })
    })
  }
}

export const isIqualTo = {
  getMessage(field, [fieldValueCompare, msgSource, msgTarget], data) {
    return (data && data.message) || `The fields '${msgSource}' and '${msgTarget}' must be equal.`;
  },
  validate(value, [fieldValueCompare, msgSource, msgTarget]) {
    return new Promise(resolve => {
      resolve({
        valid: value !== fieldValueCompare ? false : !! value,
        data: value !== 'trigger' ? undefined : { message: 'Not this value' }
      })
    })
  }
}

// based on https://github.com/baianat/vee-validate/blob/2.0.6/src/rules/dimensions.js
// and https://github.com/baianat/vee-validate/blob/2.0.6/locale/en.js#L18
export const maxDimensionsRule = {
  getMessage(field, [width, height], data) {
    return (data && data.message) || `O campo deve ter no máximo ${width}px de largura por ${height}px de altura.`;
  },
  validate(files, [width, height]) {
    const validateImage = (file, width, height) => {
      const URL = window.URL || window.webkitURL
      return new Promise(resolve => {
        const image = new Image()
        image.onerror = () => resolve({ valid: false });
        image.onload = () => resolve({
          valid: image.width <= Number(width) && image.height <= Number(height) // only change from official rule
        })
        image.src = URL.createObjectURL(file)
      })
    }
    const list = []
    for (let i = 0; i < files.length; i++) {
      // if file is not an image, reject.
      if (! /\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(files[i].name)) {
        return false
      }
      list.push(files[i])
    }
    return Promise.all(list.map(file => validateImage(file, width, height)))
  }
}
