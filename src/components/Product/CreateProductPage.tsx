import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Upload, UploadFile, UploadProps, Modal, Input, InputNumber, Form } from "antd";
import { RcFile } from "antd/es/upload";
import { API_URL } from "../../env";
import { IProductCreate } from "../../Interface/IProductCreate";

const CreateProductPage: React.FC = () => {
    const [form] = Form.useForm<IProductCreate>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // Обробник перегляду зображення
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
    };

    // Обробник змін у списку файлів
    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

    // Відправка форми
    const handleSubmit = async (values: IProductCreate) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description || "");
        formData.append("price", values.price.toString());
        formData.append("quantityInStock", values.quantityInStock.toString());
        formData.append("subCategoryId", values.subCategoryId.toString());
        fileList.forEach((file) => formData.append("images", file.originFileObj as RcFile));

        try {
            const response = await fetch(`${API_URL}/api/product`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Помилка створення продукту");
            alert("Продукт успішно створено!");
            navigate("/");
        } catch (error) {
            console.error("Помилка:", error);
            alert("Не вдалося створити продукт.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Створення продукту</h1>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item name="name" label="Назва" rules={[{ required: true, message: "Введіть назву продукту" }]}>
                    <Input placeholder="Назва продукту" />
                </Form.Item>
                <Form.Item name="description" label="Опис">
                    <Input.TextArea placeholder="Опис продукту" rows={4} />
                </Form.Item>
                <Form.Item name="price" label="Ціна" rules={[{ required: true, message: "Введіть ціну продукту" }]}>
                    <InputNumber placeholder="Ціна" style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    name="quantityInStock"
                    label="Кількість на складі"
                    rules={[{ required: true, message: "Введіть кількість продукту" }]}
                >
                    <InputNumber placeholder="Кількість" style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    name="subCategoryId"
                    label="Підкатегорія"
                    rules={[{ required: true, message: "Виберіть підкатегорію" }]}
                >
                    <InputNumber placeholder="ID підкатегорії" style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Зображення">
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        beforeUpload={() => false}
                        accept="image/*"
                        multiple
                    >
                        {fileList.length >= 10 ? null : (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Завантажити</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Створити
                </Button>
            </Form>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </div>
    );
};

export default CreateProductPage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API_URL } from "../../env";
// import { IProductCreate } from "../../Interface/IProductCreate";

// const CreateProductPage: React.FC = () => {
//     const [formData, setFormData] = useState<IProductCreate>({
//         name: "",
//         description: "",
//         price: 0,
//         quantityInStock: 0,
//         subCategoryId: 0,
//         images: [] as File[], // Масив файлів
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const files = e.target.files;
//         if (files) {
//             setFormData((prev) => ({
//                 ...prev,
//                 images: Array.from(files), // Перетворення FileList у масив файлів
//             }));
//         }
//     };
   
//     // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //     const files = e.target.files;
//     //     if (files) {
//     //       const validFiles = Array.from(files).filter(file =>
//     //         file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp"
//     //       );
      
//     //       setFormData((prev) => ({
//     //         ...prev,
//     //         images: validFiles,
//     //       }));
//     //     }
//     //   };
      
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         // Формування FormData
//         const formDataToSend = new FormData();
//         formDataToSend.append("name", formData.name);
//         formDataToSend.append("description", formData.description || "");
//         formDataToSend.append("price", formData.price.toString());
//         formDataToSend.append("quantityInStock", formData.quantityInStock.toString());
//         formDataToSend.append("subCategoryId", formData.subCategoryId.toString());

//         // Додавання файлів як "images[]"
//         formData.images.forEach((file) => {
//             formDataToSend.append("images[]", file); // Використовуємо назву "images[]", як у Swagger
//         });

//         try {
//             const response = await fetch(`${API_URL}/api/product`, {
//                 method: "POST",
//                 body: formDataToSend,
//             });

//             if (!response.ok) throw new Error("Помилка створення продукту");

//             alert("Продукт успішно створено!");
//             navigate("/products");
//         } catch (error) {
//             console.error("Помилка:", error);
//             alert("Не вдалося створити продукт.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Створення продукту</h1>
//             {error && <p className="text-red-500">{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Назва</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="border rounded-lg w-full p-2"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Опис</label>
//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         className="border rounded-lg w-full p-2"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Ціна</label>
//                     <input
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleChange}
//                         className="border rounded-lg w-full p-2"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Кількість на складі</label>
//                     <input
//                         type="number"
//                         name="quantityInStock"
//                         value={formData.quantityInStock}
//                         onChange={handleChange}
//                         className="border rounded-lg w-full p-2"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Підкатегорія</label>
//                     <input
//                         type="number"
//                         name="subCategoryId"
//                         value={formData.subCategoryId}
//                         onChange={handleChange}
//                         className="border rounded-lg w-full p-2"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Зображення</label>
//                     <input
//                         type="file"
//                         name="images"
//                         multiple
//                         onChange={handleFileChange}
//                         className="border rounded-lg w-full p-2"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//                     disabled={loading}
//                 >
//                     {loading ? "Завантаження..." : "Створити"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CreateProductPage;

