//Coleta e exibe o nome do arquivo no card.
document.getElementById('fileInput').addEventListener('change', (e) =>{
    const fileName = e.target.files[0]?.name || 'Nenhum Arquivo Selecionado';
    document.querySelector('.file').textContent = fileName  
});

// Através do evento de apertar o botão submit
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault()

    // Coleta as informações de envio de documento
    const fileInput = document.getElementById('fileInput');
    // Coleta o título selecionado
    const titleSelected = document.getElementById('titleSelect').value;
    // Coleta o elemento load para ativar o carregamento.
    const loadingElement = document.getElementById('load');

    if (fileInput.files.length === 0) {
        console.log('Nenhum arquivo selecionado.');
        return;
    }

    if (!titleSelected) {
        console.log('Nenhum título selecionado.');
        return;
    }


    



    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('title', titleSelected);


    loadingElement.style.display = 'flex';

    try {
        const response = await fetch('https://mm-data.vercel.app/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log('Arquivo enviado com sucesso!');
            const data = await response.blob(); // Para salvar o PDF retornado
            const url = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.pdf'; // Nome do arquivo baixado
            document.body.appendChild(a);
            a.click();
            a.remove();


            location.reload();
        } else {
            console.log('Erro ao enviar o arquivo:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    } finally {

        loadingElement.style.display = 'none'
    }
    
})