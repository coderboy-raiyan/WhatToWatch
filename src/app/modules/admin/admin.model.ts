import { Schema, model } from 'mongoose';
import UserConstant from '../user/user.constant';
import { TAdmin } from './admin.interface';

const adminSchema = new Schema<TAdmin>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
            required: true,
        },
        name: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        contactNo: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        profileImg: {
            type: String,
            default: '',
        },
        role: {
            type: String,
            enum: UserConstant.UserRole,
        },
    },
    { timestamps: true }
);

const Admin = model('Admin', adminSchema);

export default Admin;
