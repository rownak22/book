// বইয়ের ডাটা (পরবর্তীতে database থেকে আসবে)
const books = [
    {
        id: 1,
        title: "পদ্মা নদীর মাঝি",
        author: "ম্যানিক বন্দোপাধ্যায়",
        price: 250,
        image: "images/book1.jpg",
        description: "বাংলা সাহিত্যের কালজয়ী উপন্যাস"
    },
    {
        id: 2,
        title: "শেষের কবিতা",
        author: "রবীন্দ্রনাথ ঠাকুর",
        price: 300,
        image: "images/book2.jpg",
        description: "রবীন্দ্রনাথের প্রেমের উপন্যাস"
    },
    {
        id: 3,
        title: "হাজার বছর ধরে",
        author: "জহির রায়হান",
        price: 200,
        image: "images/book3.jpg",
        description: "চিরায়ত বাংলা উপন্যাস"
    },
    {
        id: 4,
        title: "লালসালু",
        author: "সৈয়দ ওয়ালীউল্লাহ",
        price: 180,
        image: "images/book4.jpg",
        description: "গ্রামীণ সমাজের চিত্র"
    }
];

// বই লোড করবে
function loadBooks() {
    const bookContainer = document.getElementById('book-container');
    bookContainer.innerHTML = '';
    
    books.forEach(book => {
        const bookCard = `
            <div class="book-card" data-id="${book.id}">
                <img src="${book.image}" alt="${book.title}" class="book-img">
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <p class="book-price">৳ ${book.price}</p>
                    <button class="buy-btn" onclick="viewBookDetails(${book.id})">
                        <i class="fas fa-shopping-cart"></i> বিস্তারিত দেখুন
                    </button>
                </div>
            </div>
        `;
        bookContainer.innerHTML += bookCard;
    });
    
    updateCartCount();
}

// বইয়ের ডিটেইল দেখাবে
function viewBookDetails(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        // LocalStorage এ বই সেভ করবে
        localStorage.setItem('selectedBook', JSON.stringify(book));
        // ডিটেইল পেজে রিডাইরেক্ট
        window.location.href = 'book-details.html';
    }
}

// কার্ট কাউন্ট আপডেট
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// পেজ লোড হওয়ার পর
document.addEventListener('DOMContentLoaded', function() {
    loadBooks();
    
    // কার্টে যুক্ত করবে
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('data-id');
            addToCart(bookId);
        });
    });
});
