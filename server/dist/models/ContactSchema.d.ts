import mongoose from "mongoose";
export declare const Contact: mongoose.Model<{
    name: string;
    email: string;
    message: string;
    wantsReply: boolean;
    phone?: string | null;
    phoneType?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    message: string;
    wantsReply: boolean;
    phone?: string | null;
    phoneType?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    message: string;
    wantsReply: boolean;
    phone?: string | null;
    phoneType?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    email: string;
    message: string;
    wantsReply: boolean;
    phone?: string | null;
    phoneType?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    message: string;
    wantsReply: boolean;
    phone?: string | null;
    phoneType?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    name: string;
    email: string;
    message: string;
    wantsReply: boolean;
    phone?: string | null;
    phoneType?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        name: string;
        email: string;
        message: string;
        wantsReply: boolean;
        phone?: string | null;
        phoneType?: string | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        name: string;
        email: string;
        message: string;
        wantsReply: boolean;
        phone?: string | null;
        phoneType?: string | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, mongoose.FlattenMaps<{
    name: string;
    email: string;
    message: string;
    wantsReply: boolean;
    phone?: string | null;
    phoneType?: string | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, mongoose.FlattenMaps<{
    name: string;
    email: string;
    message: string;
    wantsReply: boolean;
    phone?: string | null;
    phoneType?: string | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=ContactSchema.d.ts.map