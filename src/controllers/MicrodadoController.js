
const {
    ResourceNotFound, InvalidCredentials, AlreadyExists, InvalidFields,
} = require('../exceptions/exception');

const MicrodadoSchema = require('../models/microdadoModel');


module.exports.findById = async (req, res, next) => {
    try {
        let { params: { _id } } = req;

        let microdado = await MicrodadoSchema.findOne({ _id }).select('-password -salt -__v');

        if (!microdado || !microdado.status) { throw new ResourceNotFound("Usuário não encontrado"); }

        res.json(microdado);

    } catch (error) {
        next(error);
    }
};


module.exports.findAndCount = async (req, res, next) => {
    try {

        let { body } = req;

        const searchObj = createSearchObj(body)

        let result = await MicrodadoSchema.find(searchObj).countDocuments()

        res.json(result)

    } catch (error) {
        next(error);
    }
};

module.exports.findAndList = async (req, res, next) => {
    try {

        const { body } = req;
        const { body: { page, size } } = req;

        searchObj = createSearchObj(body);
        sortStr = createSortStr(body.sort)

        let result = await MicrodadoSchema.find(searchObj).skip((page || 0) * (size || 10)).lean()
            .sort(sortStr);

        res.json(result)

    } catch (error) {
        next(error);
    }
};

function createSearchObj(body) {

    obj = {}

    let fields = [
        'municipio',
        'regiao',
        'natureza',
        'data',
        'sexo',
        'idade_senasp',
        'total_envolvidos'
    ]

    for (const key in body) {

        if (body[key] && body[key].length > 0) {

            if (fields.find((item => item == key))) {

                switch (key) {
                    case 'sexo':

                        obj.sexo = body.sexo;
                        break;

                    case 'data':

                        obj.data = getDateInterval(body.data)
                        break;

                    case 'total_envolvidos':

                        obj.total_envolvidos = { $gte: body.total_envolvidos[0], $lte: body.total_envolvidos[1] }
                        break;

                    default:

                        obj[key] = { $in: body[key] };
                        break;
                }
            }
        }
    }

    return obj;
}

function getDateInterval(date) {

    date[0] = new Date(date[0]);
    date[0].setDate(date[0].getDate() - 1);

    date[1] = new Date(date[1]);

    if (date[0] == 'Invalid Date' || date[1] == 'Invalid Date') {
        throw new Error("Data Inválida. Formato correto: MM/DD/YYYY");
    }

    return { $gte: date[0], $lte: date[1] }
}

function createSortStr(array) {
    if (Array.isArray(array) && array.length > 0) { 
        return array.reduce((x, y) => x + y + ' ', ''); 
    }

    return null;
}