import { Schema, model } from 'mongoose';
import { TAdmin, TAdminModel } from './admin.interface';

const adminSchema = new Schema<TAdmin, TAdminModel>(
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
    },
    { timestamps: true }
);

adminSchema.statics.isAdminExists = async function (email: string) {
    const reviewer = await this.findOne({ email });
    return reviewer;
};

const Admin = model<TAdmin, TAdminModel>('Admin', adminSchema);

export default Admin;
