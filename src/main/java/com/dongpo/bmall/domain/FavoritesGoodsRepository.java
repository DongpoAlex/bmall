package com.dongpo.bmall.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

/**
 * Created by AlexBob on 2016/1/27.
 */
@RepositoryRestResource(path = "favoritesGoods")
public interface FavoritesGoodsRepository extends PagingAndSortingRepository<FavoritesGoods, Integer> {

    @RestResource(path = "/byFavorited")
    @Query("select FG from FavoritesGoods FG where guestId = ?1 and favorited=true")
    Page<FavoritesGoods> findByGuestId(@Param("guestId") String guestId, Pageable var1);
}
