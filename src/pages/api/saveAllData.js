import { connectToDatabase } from './connectToDatabase';

export default async function saveAllData(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('buildingProject');

    const material = req.body.info;
    const ID = req.body.ID;

    try {
        // Busca documentos con la clave "uso" igual a "materiales"
        const query = { uso: 'materiales' };
        const existingDocument = await collection.findOne(query);

        if (existingDocument) {
            // Recorre los valores actuales de "materiales"
            const updatedMateriales = {};
            for (const existingID in existingDocument.materiales) {
                if (existingID !== ID) {
                    updatedMateriales[existingID] = existingDocument.materiales[existingID];
                }
            }
            // Agrega el nuevo valor
            updatedMateriales[ID] = material;

            // Actualiza el documento con el nuevo arreglo de "materiales"
            await collection.updateOne({ _id: existingDocument._id }, { $set: { materiales: updatedMateriales } });

            console.log('Data updated successfully');
            res.status(200).json({ message: 'Data updated successfully' });
        } else {
            // Crea un nuevo documento si no existe
            const newDocument = {
                uso: 'materiales',
                materiales: { [ID]: material }, // Asigna el valor
            };
            await collection.insertOne(newDocument);

            console.log('New data saved successfully');
            res.status(200).json({ message: 'New data saved successfully' });
        }
    } catch (error) {
        console.error('An error occurred while saving the data:', error);
        res.status(500).json({ error: 'An error occurred while saving the data' });
    }
}



