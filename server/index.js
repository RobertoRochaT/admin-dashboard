import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import User from './models/User.js'
import { dataUser } from "./Data/index.js"

import Card from './models/Cards.js'
import { datacards } from "./Data/carData.js"

import Consults from './models/Consults.js'
import {recentConsults} from './Data/recentConsults.js'
import {DConsults} from './Data/DConsults.js'
dotenv.config();

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

/* SINGUP */
import bcrypt from 'bcrypt';

app.post('/api/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;

    // Validar campos requeridos
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hashear la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear el nuevo usuario
        const newUser = new User({
            name,
            email,
            phoneNumber: phone,
            password: hashedPassword,
        });

        // Guardar en la base de datos
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

/* LOGIN */

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

/* ROUTES CARDS */
app.get('/api/cards',(req,res) =>{
    Card.find({})
    .then((cards) => res.json(cards))
    .catch((error) => res.status(400).json(`Error: ${error}`));
});

app.get('/api/cards/:id', (req,res)=>{
    const id = req.params.id;
    Card.findById(id)
    .then((card) => res.json(card))
    .catch((error) => res.status(400).json(`Error: ${error}`));
})

app.post('/api/cards', async (req, res) => {
    const { name, icon, amount, percentage, active } = req.body;

    try {
        const updatedCard = await Card.findOneAndUpdate(
            { name }, // Busca por el nombre de la tarjeta
            {
                $set: { icon, active }, // Actualiza otros campos si es necesario
                $inc: { amount: 1, percentage: 0.05 }, // Incrementa dinámicamente
            },
            { new: true, upsert: true } // Crea la tarjeta si no existe
        );

        res.json(updatedCard);
    } catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
});


/* RECENT QUERY */
app.get('/api/recentConsults', async (req, res) => {
    try {
      const consults = await Consults.find({}).sort({ date: -1 }); // Ordenar por fecha descendente
      res.json(consults);
    } catch (error) {
      res.status(400).json(`Error: ${error}`);
    }
});

app.post('/api/recentConsults', (req,res)=>{
    const {user, query, responseTime, status,date} = req.body;
    if (!user || !query || !responseTime || !status) {
        return res.status(400).json({ error: 'Se requiere el nombre, la consulta, el tiempo de respuesta y el estado' });
    }

    const newConsult = new Consults({
        user,
        query,
        responseTime,
        status,
        date,
    });

    newConsult.save()
        .then((consult) => res.json(consult))
        .catch((error) => res.status(400).json(`Error: ${error}`));
})

app.get('/api/consultas-bot', async (req, res) => {
    try {
        const data = await Consults.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$date' }
                    },
                    count: { $sum: 1}
                }
            },
            {
                $sort: { _id: 1 } // Ordenar por fecha
            }
        ]);

        // Transformar los datos para que coincidan con el formato esperado
        const formattedData = data.map(item => ({
            date: item._id,
            count: item.count,
        }));

        res.json(formattedData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching consultas-bot data', details: error.message });
    }
});


/* Routes  Users */

app.get('/', (req, res) => {
    res.send('<h1>API is running</h1>');
});


app.get('/api/users', (req, res) => {
    User.find({})
        .then((users) => res.json(users))
        .catch((error) => res.status(400).json(`Error: ${error}`));
});

const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

       // Card.insertMany(datacards)
       // Consults.insertMany(recentConsults)

       // insertar DConsults a consultas-bot
       //Consults.insertMany(DConsults)


    })
    .catch((error) => console.log(`${error} did not connect`));
