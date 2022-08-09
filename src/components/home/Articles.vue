<template>
	<div class="articles">
		<h2>{{ $tr[$route.params.lang].talkAboutUs }}</h2>
		<div class="articles__section">
			<a 
				href="https://www.ledauphine.com/economie/2022/06/17/chambery-maud-zellner-a-cree-une-appli-pour-simplifier-les-vacances"
				target="_blank"
				class="articles__article">
				<img
					src="@/assets/images/home/articles/dauphine.png"
					alt="article dauphine"
				>
				<p>{{ $tr[$route.params.lang].dauphineTitle }}</p>
			</a>
			<a 
				href="https://www.francebleu.fr/emissions/la-relance-eco/pays-de-savoie"
				target="_blank"
				class="articles__article">
				<video controls>
					<source
						src="@/assets/videos/france_bleu.mp4"
						type="video/mp4"
					/>
				</video>
				<p>{{ $tr[$route.params.lang].franceBleuTitle }}</p>
			</a>
			<a 
				href="https://www.lavoixdunord.fr/1202141/article/2022-07-05/tutuyoutoo-l-appli-pour-des-vacances-en-toute-simplicite"
				target="_blank"
				class="articles__article">
				<img
					src="@/assets/images/home/articles/voix-du-nord.png"
					alt="article voix du nord"
				>
				<p>{{ $tr[$route.params.lang].voixTitle }}</p>
			</a>
		</div>
	</div>
</template>

<script>
export default {
  name: "Articles"
}
</script>

<style lang="scss" scoped>
.articles {
	width: 980px;
  padding: 70px 40px;
  border-bottom: 2px solid $color-police-main;
	h2 {
		margin: 0;
		text-align: center;
		margin-bottom: 5px;
		text-transform: uppercase;
	}
	p {
		text-align: center;
	}
	&__section {
		margin-top: 50px;
		@include flex(row, flex-start, center);
	}
	&__article {
		cursor: pointer;
		margin: 0px 30px;
		@include flex(column, center, center);
		img, video {
			width: 350px;
		}
	}
}

@include breakpoint(1279) {
  .articles {
    width: 600px;
    padding: 70px 60px;
		&--is-last {
			margin-top: 20px;
    	padding-bottom: 0px;
		}
		&__section {
			flex-direction: column;
			align-items: center;
		}
		&__article {
			margin: 10px 0px;
			img, video {
				width: 300px;
			}
		}
  }
}

@include breakpoint(800) {
  .articles {
    width: calc(90% - 25px);
    padding: 60px 0px;
		h2 {
			font-size: 18px;
		}
		&__section {
			margin-top: 30px;
		}
		&__article {
			img, video {
				width: 260px;
			}
		}
  }
}
</style>