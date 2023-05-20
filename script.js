fetch('./dados.json')
  .then(response => response.json())
  .then(data => {
    const slider = document.getElementById('slider');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    let currentPosition = 0;

    function createSlide(produto) {
      const slide = document.createElement('div');
      slide.classList.add('slide');

      const imagemElement = document.createElement('img');
      imagemElement.src = produto.imagem;

      const nomeElement = document.createElement('h2');
      nomeElement.textContent = produto.nome;

      const precoElement = document.createElement('p');
      const precoStrongElement = document.createElement('strong');
      precoStrongElement.textContent = `POR R$ ${produto.preco.toFixed(2)}`;
      precoElement.appendChild(precoStrongElement);
      precoElement.classList.add('price');

      const parcelasElement = document.createElement('p');
      parcelasElement.textContent = `Em até ${produto.installment_amount}x de R$ ${produto.installment_value.toFixed(2)} sem juros`;

      slide.appendChild(imagemElement);
      slide.appendChild(nomeElement);
      slide.appendChild(precoElement);
      slide.appendChild(parcelasElement);

      slider.appendChild(slide);
    }

    function showSlide(index) {
      const slides = document.querySelectorAll('.slide');
      slides.forEach((slide, i) => {
        if (i === index) {
          slide.style.display = 'block';
        } else {
          slide.style.display = 'none';
        }
      });
    }

    function slideNext() {
      currentPosition++;
      const totalSlides = data.produtos.length;
      if (currentPosition >= totalSlides) {
        currentPosition = 0;
      }
      showSlide(currentPosition);
    }

    function slidePrev() {
      currentPosition--;
      const totalSlides = data.produtos.length;
      if (currentPosition < 0) {
        currentPosition = totalSlides - 1;
      }
      showSlide(currentPosition);
    }

    // Cria os slides com os produtos
    data.produtos.forEach(produto => {
      createSlide(produto);
    });

    showSlide(currentPosition);

    // Configura os botões para avançar e voltar
    prevButton.addEventListener('click', slidePrev);
    nextButton.addEventListener('click', slideNext);
  })
  .catch(error => {
    console.log('Ocorreu um erro ao carregar o arquivo JSON:', error);
  });
