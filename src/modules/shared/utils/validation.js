const arrayMessage =  [

    {
        name: 'email',
        required: 'Debes introducir un correo',
        valid: "Debe ingresar un correo valido"
    },
    {
        name: 'password',
        required: 'Debes introducir una contraseña'
    },
    {
        name: 'zone',
        required: 'Se requiere un nombre para la zona'
    }
]

const findMsg = (msg, value) => arrayMessage.find(item => item.name === msg)[value]


export const validationForm = () => ({
    min: (value, min) => (value && value.length >= min) || 'Debe tener 6 caracteres como mínimo' + min,
    max: (v, max) => (v && v.length <= max) || `La contraseña excede los 15 caracteres ${max(v,6)}`,
    email: (v)  => /.+@.+\..+/.test(v) || findMsg( 'email' , 'valid'),
    required: (value, msg ) => !!value || findMsg( msg , 'required')
})

