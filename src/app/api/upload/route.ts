import { NextApiRequest, NextApiResponse } from 'next';
import multiparty from 'multiparty';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    api: { bodyParser: false },
};

export async function POST(req: any, res: any) {
    const form = new multiparty.Form();

    const { fields, files }: any = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
    console.log(fields)
    console.log(files)
    res.json('ok')

}
